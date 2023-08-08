# HumanIn Project

## Refactor 내용

1. [Javascript로 작성된 HumanIn Project React Native 앱](https://github.com/i-soft-lab/humamin-react-native.git)을
   타입스크립트로 마이그레이션 했습니다.
2. `Webview`와 `ChartJs`로 구성된 차트를 `react-native-charts-wrapper`로 변경했습니다.
3. Sender에서 받아오는 데이터를 0.5초당 한개로 다운샘플링 했습니다.
4. wifi 스크린을 삭제했습니다.
5. 바텀바를 삭제하고, 블루투스가 연결되면 자동으로 그래프 화면으로 넘어가도록 하는 등 화면 플로우를 개선했습니다.

## 화면 플로우

```mermaid
graph LR
    A(앱 실행) -- 권한이 이미 허용된 상태 --> B(블루투스 화면 진입) --> C(기기 연결 버튼 클릭)
    A -- 앱 다운 후 첫실행 --> G(블루투스 권한 허용) -- 권한 허용 완료 --> B
    C -- 기기 연결 시 자동으로 그래프화면 진입 --> D(데이터 받아와서 그래프에 표시함)
    C -- 기기 연결 안되면 그래프 화면 안넘어감 --> C
    D -- 뒤로가기 버튼 클릭 --> E(블루투스 연결 화면으로 이동)
    D -- 블루투스 연결 끊김 or 초기화 버튼 누름 --> F(블루투스 연결 화면으로 이동)
```
