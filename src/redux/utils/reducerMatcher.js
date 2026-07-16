export const isPendingAction = (action) => action.type.endsWith("/pending");
export const isFulfilledAction = (action) => action.type.endsWith("/fulfilled");
export const isRejectedAction = (action) => action.type.endsWith("/rejected");

export const addGenericMatcher = (builder) => {
  builder
    .addMatcher(isPendingAction, (state) => {
      state.isLoading = true;
      state.isError = null;
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
