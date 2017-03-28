export const INIT_APP = 'INIT_APP';

export function initApp(p) {
  const args = { ...p };
  args.type = INIT_APP;
  return args;
}
