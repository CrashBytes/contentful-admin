import contentful from 'contentful-management';

const SPACE_ID = process.env.SPACE_ID || 'none';

const client = contentful.createClient({

 accessToken: process.env.ACCESS_TOKEN,

});

export async function bulkPublish(contentType) {

 await handleBulkAction(contentType, 'publish');

}

export async function bulkUnpublish(contentType) {

 await handleBulkAction(contentType, 'unpublish');

}

export async function publishSingle(entryId, environment) {

 await handleSingleAction(entryId, environment, 'publish');

}

export async function unpublishSingle(entryId, environment) {

 await handleSingleAction(entryId, environment, 'unpublish');

}

async function handleBulkAction(contentType, action) {

 try {

  console.log(`Fetching space and environment for bulk ${action}...`);

  const space = await client.getSpace(SPACE_ID);

  const environment = await space.getEnvironment('QA');

  console.log(`Fetching all entries for content type: ${contentType}...`);

  const entries = await environment.getEntries({

   content_type: contentType,

  });

  const items = entries.items;

  if (items.length === 0) {

   console.log(`No entries found for content type: ${contentType}.`);

   return;

  }

  console.log(`Found ${items.length} entries for content type: ${contentType}. Performing ${action}...`);

  for (const entry of items) {

   try {

    await handleSingleAction(entry.sys.id, environment, action);

   } catch (error) {

    console.error(`Failed to ${action} entry ${entry.sys.id}:`, error.message);

    console.error(`Error details:`, error);

   }

  }

  console.log(`All entries processed for ${action}.`);

 } catch (error) {

  console.error(`Error during bulk ${action}:`, error.message);

  console.error(`Error details:`, error);

 }

}

async function handleSingleAction(entryId, environment, action) {

 try {

  const entryObject = await environment.getEntry(entryId);

  let result;

  if (action === 'publish') {

   result = await entryObject.publish();

  } else if (action === 'unpublish') {

   result = await entryObject.unpublish();

  }

  console.log(`${action.charAt(0).toUpperCase() + action.slice(1)}ed entry: ${result.sys.id}`);

 } catch (error) {

  console.error(`Failed to ${action} entry ${entryId}:`, error.message);

  throw error; // Re-throw the error for the caller to handle

 }

}