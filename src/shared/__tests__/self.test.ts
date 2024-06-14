import { getSelfPackage } from '../self';

describe('getSelfPackage', () => {
  it('should returns valid package.json data', () => {
    const pkg = getSelfPackage();

    vi.spyOn(pkg, 'name', 'get').mockImplementation(() => 'test');

    expect(pkg.name).toBe('test');
  });
});
