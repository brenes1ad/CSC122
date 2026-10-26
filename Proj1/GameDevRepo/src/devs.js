//devs.js

import { ref } from 'vue';

export const devs = ref([
    { devId: 1, name: 'Nintendo', headquarters: 'Kyoto, Japan', website: 'nintendo.com' },
    { devId: 2, name: 'Sony', headquarters: 'Tokyo, Japan', website: 'sony.com' },
    { devId: 3, name: 'Valve', headquarters: 'Washington, USA', website: 'valve.com' },
]);

let nextId = 4;

export function getDev(devId) {
    return devs.value.find((a) => a.devId === Number(devId));
}

export function addDev(dev) {
    devs.value.push({ ...dev, devId: nextId++ });
}

export function updateDevById(dev) {
    const index = devs.value.findIndex((a) => a.devId === Number(dev.devId));
    if (index === -1) throw new Error('Could not find that dev.');
    devs.value[index] = { ...dev };
}

export function deleteDevById(devId) {
    devs.value = devs.value.filter((a) => a.devId !== Number(devId));
}


