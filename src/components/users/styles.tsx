import { Link } from "react-router-dom";
import tw from "twin.macro";
import styled from "@emotion/styled";

export const CardHolder = styled.div`
  ${tw`w-11/12 mx-auto mt-12 grid grid-cols-12 gap-6`}
  & > code {
    ${tw`text-sm col-span-12`}
  }
`;

export const UserCard = styled(Link)`
  ${tw`rounded-md shadow-custom p-3 col-span-2 hover:shadow-customHover inline-block transition duration-300 ease-in-out`}

  & .jobPosition {
    ${tw`block text-xs`}
  }
`;

// overview styles
export const OverviewContainer = styled.div`
  ${tw`w-11/12 mx-auto my-12 grid grid-cols-12 gap-6`}

  & > h2 {
    ${tw`text-3xl font-bold col-span-12`}
  }
`;
export const OverviewItems = styled.div`
  ${tw`col-span-4 flex flex-col`}

  & > code {
    ${tw`text-sm mb-3`}

    &:not(:first-of-type) {
      ${tw`mt-6`}
    }
  }
  & > a:not(:last-of-type) {
    ${tw`mb-4`}
  }
`;

export const Card = styled.div`
  ${tw`rounded-md shadow-custom p-3 col-span-2 inline-block transition duration-300 ease-in-out h-full flex flex-col justify-center`}
  min-height: 64px;
  max-height: 64px;
  & > .code {
    ${tw`text-xs`}
  }
  & > .title {
    ${tw`font-bold`}
  }
`;
