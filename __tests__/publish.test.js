import * as publishModule from '../publish.mjs';

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
                publish: jest.fn(() => Promise.resolve({ sys: { id } })),
                unpublish: jest.fn(() => Promise.resolve({ sys: { id } })),
              })
            ),
          })
        ),
      })
    ),
  })),
}));

describe('publish.mjs', () => {
  it('bulkPublish should process all entries', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await publishModule.bulkPublish('testType');
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('All entries processed for publish.')
    );
    logSpy.mockRestore();
  });

  it('bulkUnpublish should process all entries', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await publishModule.bulkUnpublish('testType');
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('All entries processed for unpublish.')
    );
    logSpy.mockRestore();
  });

  it('publishSingle should publish a single entry', async () => {
    const mockEnv = {
      getEntry: jest.fn((id) =>
        Promise.resolve({
          publish: jest.fn(() => Promise.resolve({ sys: { id } })),
        })
      ),
    };
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await publishModule.publishSingle('entry1', mockEnv);
    expect(logSpy).toHaveBeenCalledWith('Published entry: entry1');
    logSpy.mockRestore();
  });

  it('unpublishSingle should unpublish a single entry', async () => {
    const mockEnv = {
      getEntry: jest.fn((id) =>
        Promise.resolve({
          unpublish: jest.fn(() => Promise.resolve({ sys: { id } })),
        })
      ),
    };
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await publishModule.unpublishSingle('entry1', mockEnv);
    expect(logSpy).toHaveBeenCalledWith('Unpublished entry: entry1');
    logSpy.mockRestore();
  });
});