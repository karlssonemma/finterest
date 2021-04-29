import styled from 'styled-components';

const MyText = styled.h1`
  padding-left: ${props => props.theme.space[4]};
`;

export default function Home() {
  return (
    <div>
      <MyText>Hello</MyText>
    </div>
  )
}
