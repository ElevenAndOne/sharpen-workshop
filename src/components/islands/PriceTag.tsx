import { useHasPassed } from '../../lib/useCountdown';

interface Props {
  early: number;
  regular: number;
  earlyBirdEndsAt: string;
  /** What the server rendered, so the first paint matches the build. */
  initialEarly: boolean;
}

/**
 * The price that appears inside CTA labels. Static builds cannot know the
 * date, so the server renders whatever was true at build time and the client
 * corrects it after Early Bird closes.
 */
export default function PriceTag({ early, regular, earlyBirdEndsAt, initialEarly }: Props) {
  const passed = useHasPassed(earlyBirdEndsAt);
  const showEarly = passed === null ? initialEarly : !passed;
  return <>${showEarly ? early : regular}</>;
}
