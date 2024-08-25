export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const reqBody = await readBody(event)
  const url = 'https://www.whoisxmlapi.com/whoisserver/WhoisService'

  try {
    const response = await $fetch(url, {
      method: 'POST',
      body: { ...reqBody, apiKey: config.apiToken },
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return response
  } catch (error) {
    return error
  }


})
