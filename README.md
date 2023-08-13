# HumanIn Project

## Refactor 내용

1. [Javascript로 작성된 HumanIn Project React Native 앱](https://github.com/i-soft-lab/humamin-react-native.git)을
   타입스크립트로 마이그레이션 했습니다.
2. `Webview`와 `ChartJs`로 구성된 차트를 `react-native-charts-wrapper`로 변경하여 네이티브 뷰를 사용하도록 업데이트했습니다
3. wifi 스크린을 삭제했습니다.
4. 바텀바를 삭제하여 블루투스가 연결되면 자동으로 그래프 화면으로 전환되도록 화면 플로우를 개선했습니다.
5. 블루투스 연결과 MQTT 연결 설정 기능을 그래프 화면에 추가하여 사용자가 해당 기능을 더 편리하게 이용할 수 있도록 개선했습니다.
6. 슬라이더를 이용하여 임계값을 설정할 수 있는 기능도 추가되었습니다.
7. 전체적으로 사용자가 직관적으로 더 쉽게 조작할 수 있는 UI로 디자인을 개선하였습니다.

## 화면 플로우

![](https://github.com/i-soft-lab/humanin-refactor/assets/57657868/ac97056e-d832-4c9c-81a1-d2767f4c73db)

## 전체 시스템 구조

![](https://github.com/i-soft-lab/humanin-refactor/assets/57657868/003dd440-f426-465e-bf53-f1141c820211)
