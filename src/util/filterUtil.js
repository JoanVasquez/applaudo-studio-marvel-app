import Paginator from "paginator";

export const genericFilteredItem = (text, filteredBy, pageSize, dataSet) => {
  const filteredDataSet = new Set();
  dataSet.forEach((data) => {
    if (data[filteredBy].toLowerCase().includes(text.toLowerCase())) {
      filteredDataSet.add(data);
    }
  });

  const filteredData = Array.from(filteredDataSet);
  let paginator = new Paginator(pageSize, 7);
  let paginatorData = paginator.build(filteredData.length, 1);
  let pages = [
    ...Array(paginatorData.last_page + 1 - paginatorData.first_page).keys(),
  ].map((index) => paginatorData.first_page + index);
  let paginatedData = filteredData.slice(
    paginatorData.first_result,
    paginatorData.last_result + 1
  );
  let data = {
    paginatedData,
    paginatorData,
    pages,
    filteredData,
  };
  return data;
};

export const genericFilterItemByObject = (
  text,
  filteredBy,
  pageSize,
  dataSet
) => {
  const filteredDataSet = new Set();
  dataSet.forEach((dataToFilter) => {
    dataToFilter[filteredBy].items.forEach((determine) => {
      if (determine.name.toLowerCase().includes(text.toLowerCase())) {
        filteredDataSet.add(dataToFilter);
      }
    });
  });

  const filteredData = Array.from(filteredDataSet);
  let paginator = new Paginator(pageSize, 7);
  let paginatorData = paginator.build(filteredData.length, 1);
  let pages = [
    ...Array(paginatorData.last_page + 1 - paginatorData.first_page).keys(),
  ].map((index) => paginatorData.first_page + index);
  let paginatedData = filteredData.slice(
    paginatorData.first_result,
    paginatorData.last_result + 1
  );

  let data = {
    paginatedData,
    paginatorData,
    pages,
    filteredData,
  };

  return data;
};
