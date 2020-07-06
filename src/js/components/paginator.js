export default class Paginator {
  static get CONFIG() {
    return {
      itemsPerPage: 10
    };
  }

  static paginate(items, page) {
    let firstItem;
    let lastItem;

    if (page === 1) {
      firstItem = 0;
      lastItem = Paginator.CONFIG.itemsPerPage;
    } else {
      firstItem = page * Paginator.CONFIG.itemsPerPage;
      lastItem = ((page - 1) * Paginator.CONFIG.itemsPerPage) + Paginator.CONFIG.itemsPerPage;
    }

    const paginatedItems = items.slice(firstItem, lastItem);

    return paginatedItems;
  }
}
