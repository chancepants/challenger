import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

export default function Panvas() {
  return (
    <TransformWrapper>
      <TransformComponent>
        <div className="h-screen w-screen">Hello world</div>
      </TransformComponent>
    </TransformWrapper>
  );
}
