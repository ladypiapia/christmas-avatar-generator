const hats = import.meta.glob('./adorn*.png', { eager: true });
export const christmasHats = Object.values(hats).map(hat => (hat as any).default);
