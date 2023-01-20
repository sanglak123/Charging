export const ClientSelector = {
    Client: (state) => state.ClientSlice.Client.Client,
    accessToken: (state) => state.ClientSlice.Client.accessToken,
    Store: (state) => state.ClientSlice.Store,
    HistoryChangeCard: (state) => state.ClientSlice.HistoryChangeCards,
    HistoryBuyCards: (state) => state.ClientSlice.HistoryBuyCards
}