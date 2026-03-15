import { useNavigate } from "react-router-dom";

const BtnAction = ({ setReviewData, id }) => {
  const nav = useNavigate();

  const handleUpdate = () => {
    nav(`/Write?id=${id}`);
  };

  const handleDelete = () => {
    if (!window.confirm("정말 리뷰를 삭제하시겠습니까?")) return;

    setReviewData((prev) => prev.filter((item) => item.id !== Number(id)));

    nav("/"); // 삭제 후 리스트로 이동
  };

  return (
    <div className="BtnUD">
      <button onClick={handleUpdate}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default BtnAction;
