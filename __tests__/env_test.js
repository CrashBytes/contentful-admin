describe('load environment variables', () => {
  it('ACCESS_TOKEN loads from .env', () => {
    delete process.env.ACCESS_TOKEN;
    require('dotenv').config({ path: './.env' });
    expect(process.env.ACCESS_TOKEN).toBeDefined();
    expect(process.env.ACCESS_TOKEN).not.toBe('');
  });

  it('SPACE_ID loads from .env', () => {
    delete process.env.SPACE_ID;
    require('dotenv').config({ path: './.env' });
    expect(process.env.SPACE_ID).toBeDefined();
    expect(process.env.SPACE_ID).not.toBe('');
  });
});