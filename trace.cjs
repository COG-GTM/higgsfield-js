// Evidence-only tracer: logs request ids and status transitions with timestamps.
const axios = require(require.resolve('axios', { paths: [process.env.HF_SDK_DIR] }));
const realCreate = axios.create.bind(axios);
let last = null;
const ts = () => new Date().toISOString();
axios.create = (opts) => {
  const c = realCreate(opts);
  c.interceptors.response.use((r) => {
    const d = r.data || {};
    if (d.status && d.status !== last) {
      last = d.status;
      console.log(`[trace ${ts()}] ${r.config.method.toUpperCase()} ${r.config.url} -> status=${d.status} request_id=${d.request_id}`);
    } else if (d.items) {
      console.log(`[trace ${ts()}] GET ${r.config.url} -> ${d.items.length} presets`);
    }
    return r;
  });
  return c;
};
