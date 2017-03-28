const MenuList = (sources) => {
  const menus = [];
  Object.keys(sources).forEach((name) => {
    const source = sources[name];
    if ((name !== 'current') && source.cfg && source.cfg.menu) {
      if (source.cfg.menu.show) {
        menus.push(source);
      }
      return true;
    }
    return false;
  });
  menus.sort((a, b) => a.cfg.menu.order - b.cfg.menu.order);
  return menus;
};

export default MenuList;
