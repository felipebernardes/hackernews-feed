export default class Paginator {
  static get CONFIG() {
    return {
      itemsPerPage: 10
    };
  }

  static paginate(items, page) {
    let startIndex;
    let quantity;

    if (page === 1) {
      startIndex = 0;
      quantity = Paginator.CONFIG.itemsPerPage;
    } else {
      startIndex = (page - 1) * Paginator.CONFIG.itemsPerPage;
      quantity = (startIndex + Paginator.CONFIG.itemsPerPage);
    }

    const paginatedItems = items.slice(startIndex, quantity);

    return paginatedItems;
  }
}
