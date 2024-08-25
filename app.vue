<script setup lang="ts">
const toast = useToast();
const options = ref(["Domain Information", "Contact Information"]);
const selectedOption = ref("Domain Information");
const data = ref();
const domainName = ref("amazon.com");
const loading = ref(false);

async function handleSubmit() {
  try {
    loading.value = true;
    const response = await $fetch("/api/submit", {
      method: "post",
      body: { domainName: domainName.value, outputFormat: "JSON" },
    });

    data.value = response;
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: error.data.statusCode + " " + error.data.statusMessage,
      detail: error.data.data.ErrorMessage.msg,
      life: 3000,
    });
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Toast />
  <div class="grid grid-nogutter p-4 gap-5">
    <div class="col-6 col-offset-3 p-4 border-round-2xl min-w-min" style="box-shadow: 0px 0px 8px lime">
      <div class="flex flex-column gap-2 justify-content-center text-center">
        <InputText v-model="domainName" label="asdf" placeholer="amazon.com" />
        <div class="flex flex-row justify-content-center flex-wrap my-2">
          <div class="flex mr-5" v-for="(option, index) in options" :key="index">
            <RadioButton v-model="selectedOption" :inputId="option" name="dynamic" :value="option" />
            <label :for="option" class="ml-2">{{ option }}</label>
          </div>
        </div>

        <Button
          class="border-round-2xl"
          @click="handleSubmit"
          :loading="loading"
          label="Submit"
          outlined
          style="box-shadow: 0px 0px 8px lime"
        />
      </div>
    </div>
    <div class="col-12">
      <div v-if="selectedOption == 'Domain Information'">
        <DataTable size="small" :value="data" tableStyle="min-width: 50rem">
          <Column field="domainName" header="Domain Name"></Column>
          <Column field="registrarName" header="Registrar"></Column>
          <Column field="registryData.createdDate" header="Registration Date">
            <template #body="slotProps">
              <Tag v-if="slotProps.data.registryData.createdDate" severity="info">
                {{ new Date(Date.parse(slotProps.data.registryData.createdDate)).toLocaleString() }}
              </Tag>
            </template>
          </Column>
          <Column field="registryData.expiresDate" header="Expiration Date">
            <template #body="slotProps">
              <Tag v-if="slotProps.data.registryData.expiresDate" severity="info">
                {{ new Date(Date.parse(slotProps.data.registryData.expiresDate)).toLocaleString() }}
              </Tag>
            </template>
          </Column>
          <Column field="estimatedDomainAge" header="Estimated Domain Age"></Column>
          <Column header="Hostnames">
            <template #body="slotProps">
              {{
                slotProps.data.registryData.nameServers.hostNames
                  .map((item: string) => (item.length > 25 ? item.slice(0, 25) + "..." : item))
                  .join(", ")
              }}
              <!-- <Tag severity="info" class="m-1" v-for="(hostname, index) in slotProps.data.registryData.nameServers.hostNames" :key="index">
              {{ hostname.length > 25 ? hostname.slice(0, 25) + "..." : hostname }}
              <template v-if="index < slotProps.data.registryData.nameServers.hostNames.length - 1">,</template>
            </Tag> -->
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-else>
        <DataTable size="small" :value="data" tableStyle="min-width: 50rem">
          <Column field="registrant.name" header="Registrant Name"></Column>
          <Column field="technicalContact.name" header="Technical Contact Name"></Column>
          <Column field="administrativeContact.name" header="Administrative Contact Name"></Column>
          <Column field="contactEmail" header="Contact Email"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
