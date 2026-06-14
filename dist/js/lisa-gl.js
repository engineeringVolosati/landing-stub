(() => {
  const canvas = document.getElementById('lisa-gl');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
  if (!gl) {
    canvas.classList.add('is-fallback');
    return;
  }

  const vertex = `
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragment = `
    precision mediump float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uRes;

    float box(vec2 p, vec2 b) {
      vec2 d = abs(p) - b;
      return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
    }

    mat2 rot(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, -s, s, c);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uRes.xy) / min(uRes.x, uRes.y);
      vec2 p = uv;
      p *= rot(0.48 + sin(uTime * 0.35) * 0.06);

      float core = box(p, vec2(0.28));
      vec2 p2 = (uv + vec2(0.12, -0.09)) * rot(-0.31 + cos(uTime * 0.28) * 0.05);
      float back = box(p2, vec2(0.26));
      float edge = smoothstep(0.018, 0.0, abs(core));
      float plane = smoothstep(0.02, -0.015, core);
      float backEdge = smoothstep(0.018, 0.0, abs(back)) * 0.45;

      float ray = smoothstep(0.02, 0.0, abs(p.x + p.y * 0.42)) * smoothstep(0.68, 0.02, length(uv));
      float glow = 0.18 / (0.18 + dot(uv, uv));

      vec3 paper = vec3(0.984, 0.988, 0.992);
      vec3 ink = vec3(0.078, 0.086, 0.102);
      vec3 blue = vec3(0.173, 0.290, 0.435);
      vec3 line = vec3(0.72, 0.735, 0.76);

      vec3 color = mix(paper, line, backEdge);
      color = mix(color, blue, plane * 0.92);
      color = mix(color, ink, edge);
      color += blue * ray * 0.16 + paper * glow * 0.18;

      float alpha = max(max(plane * 0.92, edge), backEdge);
      alpha = max(alpha, ray * 0.2 + glow * 0.12);
      gl_FragColor = vec4(color, alpha);
    }
  `;

  function shader(type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    return s;
  }

  const program = gl.createProgram();
  gl.attachShader(program, shader(gl.VERTEX_SHADER, vertex));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(program, 'uTime');
  const uRes = gl.getUniformLocation(program, 'uRes');

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const size = Math.max(canvas.clientWidth, canvas.clientHeight) * ratio;
    canvas.width = size;
    canvas.height = size;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function frame(time) {
    resize();
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTime, time * 0.001);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();
