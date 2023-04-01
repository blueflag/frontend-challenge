import tw from "twin.macro";
import styled from "@emotion/styled";

export const ResourcesContainer = styled.div`
  ${tw`w-11/12 mx-auto mt-12 grid grid-cols-12 gap-6`}
`;

export const Card = styled.div`
  ${tw`rounded-md shadow-custom p-3 col-span-2 inline-block transition duration-300 ease-in-out h-full flex flex-col justify-center`}
  & > .code {
    ${tw`text-xs`}
  }
  & > .title {
    ${tw`font-bold mb-3`}
  }

  & > hr {
    ${tw`mb-3`}
  }
  & .datas {
    ${tw`text-sm`}
  }
`;
