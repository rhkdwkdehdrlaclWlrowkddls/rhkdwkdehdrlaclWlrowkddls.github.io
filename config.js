// ✏️ 이 파일만 수정하면 사이트 내용이 바뀝니다.
window.SITE = {
  githubUsername: "your-username", // 깃허브 아이디로 바꾸면 아바타/레포 목록이 자동으로 불러와져요
  name: "김남우",
  bio: "배우고 만드는 걸 좋아하는 개발자 🌱",
  location: "Seoul, Korea",
  email: "you@example.com",
  website: "",
  status: "🚀 Building something cool",

  // Overview 탭의 README
  readme: `
    <h2>👋 안녕하세요, 김남우입니다</h2>
    <p>웹과 새로운 기술을 좋아하고, 직접 만들어 보면서 배우는 걸 즐깁니다.</p>
    <ul>
      <li>🔭 지금 하고 있는 것: 개인 홈페이지 만들기</li>
      <li>🌱 배우는 중: JavaScript, React</li>
      <li>📫 연락: 프로필의 이메일로 편하게 연락주세요</li>
    </ul>
  `,

  skills: ["HTML", "CSS", "JavaScript", "Python", "Git"],

  // 고정(Pinned) 프로젝트
  pinned: [
    { name: "my-homepage", desc: "깃허브 스타일로 만든 개인 홈페이지", lang: "HTML", url: "#" },
    { name: "project-two", desc: "프로젝트 설명을 적어주세요", lang: "JavaScript", url: "#" },
    { name: "project-three", desc: "프로젝트 설명을 적어주세요", lang: "Python", url: "#" },
    { name: "notes", desc: "공부한 내용 정리", lang: "Markdown", url: "#" },
  ],
};
