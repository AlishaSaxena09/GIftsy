import { nanoid } from "nanoid";

const createResource = (resourceName, initialValues = []) => {
  const getCollectionFromArray = (arr) => {
    return arr.reduce((acc, record) => {
      const recordId = record?.id || nanoid(8);
      acc[recordId] = { id: recordId, ...record };
      return acc;
    }, {});
  };
  const setToLocalStorage = (collectionData) => {
    localStorage.setItem(resourceName, JSON.stringify(collectionData));
  };
  const getFromLocalStorage = () => {
    if (!localStorage.getItem(resourceName)) {
      const parsedData = getCollectionFromArray(initialValues);
      setToLocalStorage(parsedData);
      return parsedData;
    }
    return JSON.parse(localStorage.getItem(resourceName)) || {};
  };
  return {
    getAll: () => {
      const data = getFromLocalStorage();
      return Object.values(data);
    },

    getById: (id) => {
      const data = getFromLocalStorage();
      return data[id] || null;
    },

    findByFields: (fields = {}) => {
      const data = getFromLocalStorage();
      return Object.values(data).find((record) => {
        return Object.keys(fields).every(
          (field) => record[field] === fields[field]
        );
      });
    },

    getAllByFields: (fields = {}) => {
      const data = getFromLocalStorage();
      return Object.values(data).filter((record) => {
        return Object.keys(fields).every(
          (field) => record[field] === fields[field]
        );
      });
    },

    create: (record) => {
      const data = getFromLocalStorage();
      const recordId = record?.id || nanoid(8);
      data[recordId] = { id: recordId, ...record };
      setToLocalStorage(data);
      return Object.values(data);
    },
  };
};

export default createResource;
