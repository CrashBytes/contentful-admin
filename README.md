# Contentful Admin

A Node.js utility for bulk managing Contentful entries, including bulk delete, publish, and unpublish operations.  
Developed by Michael Eakins ([CrashBytes](https://github.com/CrashBytes)).

---

## Features

- **Bulk Delete** Contentful entries by content type
- **Bulk Publish/Unpublish** entries by content type
- **Single Entry Delete/Publish/Unpublish**
- Automated `.env` setup script
- Unit tested with Jest + Babel

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/CrashBytes/contentful-admin.git
cd contentful-admin
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Setup Environment Variables

Run the install script to create a `.env` file with the required keys:

```sh
npm run install-env
```

This will create (or update) a `.env` file in your project root with:

```
ACCESS_TOKEN=your_access_token_here
```

Replace `your_access_token_here` with your actual Contentful Management API token.

---

## Unit Testing

This project uses **Jest** (with Babel) for unit testing.

- Test files are located in the `__tests__` directory.
- Both CommonJS and ESM modules are supported via Babel.

### Run All Tests

```sh
npm test
```

or

```sh
npx jest
```

---

## Usage

### Bulk Delete Entries

```js
import { bulkDelete } from './delete.mjs';

await bulkDelete('yourContentTypeId');
```

### Bulk Publish Entries

```js
import { bulkPublish } from './publish.mjs';

await bulkPublish('yourContentTypeId');
```

### Bulk Unpublish Entries

```js
import { bulkUnpublish } from './publish.mjs';

await bulkUnpublish('yourContentTypeId');
```

### Delete a Single Entry

```js
import { deleteSingle } from './delete.mjs';

// You need an environment object (see Contentful SDK docs)
await deleteSingle('entryId', environment);
```

### Publish/Unpublish a Single Entry

```js
import { publishSingle, unpublishSingle } from './publish.mjs';

// You need an environment object (see Contentful SDK docs)
await publishSingle('entryId', environment);
await unpublishSingle('entryId', environment);
```

---

## Keywords

contentful, contentful-management, admin, bulk-delete, bulk-publish, unpublish, automation, content-management, CrashBytes

---

## License

GPL

---

## Author

Michael Eakins

---

## Company

Visit [CrashBytes](https://www.crashbytes.com) for more projects and services.

---

## Bug Reports & Contributions

If you encounter a bug or have a feature request, please [open an issue](https://github.com/CrashBytes/contentful-admin/issues) on GitHub.

Pull requests are welcome!