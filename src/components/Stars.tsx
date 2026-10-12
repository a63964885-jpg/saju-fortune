import { StyleSheet, View } from 'react-native';

// 고정 좌표로 그려 정적 빌드와 클라이언트 렌더 결과가 같게 한다.
const STARS = [
  [8, 12, 2], [22, 30, 1.5], [35, 8, 2.5], [48, 22, 1.5], [62, 10, 2], [78, 28, 1.5],
  [90, 14, 2.5], [14, 52, 1.5], [70, 48, 2], [86, 60, 1.5], [30, 70, 2], [55, 64, 1.5],
] as const;

/** 밤하늘 배경 위의 작은 별들 */
export function Stars() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {STARS.map(([left, top, size], i) => (
        <View
          key={i}
          style={[
            styles.star,
            { left: `${left}%`, top: `${top}%`, width: size, height: size, opacity: 0.5 + (i % 3) * 0.2 },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  star: { position: 'absolute', borderRadius: 2, backgroundColor: '#FFF7E0' },
});
