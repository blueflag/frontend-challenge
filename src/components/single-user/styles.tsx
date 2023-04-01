import tw from "twin.macro";
import styled from "@emotion/styled";

export const UserContainer = styled.div`
  ${tw`w-11/12 mx-auto mt-12`}
`;

export const UserDataContainer = styled.div``;
export const SingleUserName = tw.h2`text-3xl font-bold`;
export const SingleUserOccupation = tw.p`font-bold`;

export const DataContainer = styled.div`
  ${tw`mt-4 grid grid-cols-12 gap-6 pb-10`}
`;
export const DetailsContainer = styled.div`
  ${tw`col-span-2`}

  & > h3 {
    ${tw`text-2xl mb-3 font-bold`}
  }
`;
export const DetailsListItem = styled.li`
  ${tw`shadow-custom rounded-md p-6 font-bold`}
  &:not(:last-of-type) {
    ${tw`mb-4`}
  }

  & > .code {
    ${tw`text-xs font-normal`}
  }

  & > .title {
    ${tw`font-bold`}
  }

  & > .last-attempt {
    ${tw`text-xs font-normal`}
  }
`;
