import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const publicStore = createApi({
  reducerPath: 'publicStore',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080', 
    credentials: 'include',
    prepareHeaders: (header) => {
      header.set("Accept", 'application/json');
      return header
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
        query: (body) => {
            return {
                url: "/api/v1/users/register",
                method: "POST",
                body: body
            }
        }
    })
  }),
});

export const {
    useRegisterMutation
} = publicStore;
