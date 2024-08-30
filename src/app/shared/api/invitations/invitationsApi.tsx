/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createApi, mutation, query, subApi,
} from '@shared/api/apiBuilder';
import axios from '../axios';
import { URLS } from '../urls';
import { queryClient } from '../cavagoReactQueryProvider';
import { InvitationSchema, DeclineInvitationSchema } from './scheme';
import { DECLINED_STATUS } from '@shared/constants/invitations';

const invitationApiDef = subApi(
  {
    getInvitations: query({
      output: InvitationSchema.array(),
      queryFn: async () => (await axios.get(URLS.getInvitations)).data,
    }),
    declineInvitation: mutation({
      output: DeclineInvitationSchema,
      mutationFn: async ({ invitation_id }: { invitation_id: number, }) => {
        return (await axios.patch(URLS.declineInvitation.replace('invitation_id', invitation_id.toString()), { status: DECLINED_STATUS })).data
      },
    }),
  },
);

export default createApi({
  queryClient,
  debug: {
    mockEnabled: false,
  },
  onError: () => { },
  parseError: (e) => console.log(e),
  basePath: ['invitation'],
}, invitationApiDef);
