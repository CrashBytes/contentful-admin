import * as deleteModule from '../delete.mjs';

jest.mock('contentful-management', () => ({
  createClient: jest.fn(() => ({
    getSpace: jest.fn(() =>
      Promise.resolve({
        getEnvironment: jest.fn(() =>
          Promise.resolve({
            getEntries: jest.fn(() =>
              Promise.resolve({
                items: [
                  { sys: { id: 'entry1' } },
                  { sys: { id: 'entry2' } },
                ],
              })
            ),
            getEntry: jest.fn((id) =>
              Promise.resolve({
                delete: jest.fn(() => Promise.resolve()),
              })
            ),
          })
        ),
      })
    ),
  })),
}));

describe('delete.mjs', () => {
  it('bulkDelete should process all entries', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await deleteModule.bulkDelete('testType');
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('All entries processed for delete.')
    );
    logSpy.mockRestore();
  });

  it('deleteSingle should delete a single entry', async () => {
    const mockEnv = {
      getEntry: jest.fn(() =>
        Promise.resolve({
          delete: jest.fn(() => Promise.resolve()),
        })
      ),
    };
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await deleteModule.deleteSingle('entry1', mockEnv);
    expect(logSpy).toHaveBeenCalledWith('Deleted entry: entry1');
    logSpy.mockRestore();
  });
});
