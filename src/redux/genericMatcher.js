const isPendingAction = (action) => action.type.endsWith("/pending");
const isFulfilledAction = (action) => action.type.endsWith("/fulfilled");
const isRejectedAction = (action) => action.type.endsWith("/rejected");

export const addGenericMatcher = (builder) => {
  builder
    .addMatcher(isPendingAction, (state) => {
      state.isLoading = true;
    })
    .addMatcher(isFulfilledAction, (state) => {
      state.isLoading = false;
      state.isError = null;
    })
    .addMatcher(isRejectedAction, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
};
