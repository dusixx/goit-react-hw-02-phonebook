import { Notify } from 'notiflix';

const notifyOptions = {
  background: '#fff',
  textColor: '#434343',
};

Notify.init({
  position: 'center-top',
  timeout: 2000,
  zindex: 99999,

  failure: {
    ...notifyOptions,
    notiflixIconColor: '#d93025',
  },
  info: {
    ...notifyOptions,
    notiflixIconColor: '#1c66ee',
  },
  success: {
    ...notifyOptions,
    notiflixIconColor: '#0caf89',
  },
});

export function showError(v, opts) {
  const msg = v?.message || v;
  if (v instanceof Error) console.error(v);
  return Notify.failure(msg, { showOnlyTheLastOne: true, ...opts });
}

export function showInfo(v, opts) {
  const msg = v?.message || v;
  return Notify.info(msg, { showOnlyTheLastOne: true, ...opts });
}

export function showSuccess(v, opts) {
  const msg = v?.message || v;
  return Notify.success(msg, { showOnlyTheLastOne: true, ...opts });
}

// export function showWarn(v, opts) {
//   const msg = v?.message || v;
//   return Notify.warning(msg, opts);
// }
