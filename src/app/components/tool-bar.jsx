import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default ({ selected, setTableData }) => {
  const params = useParams();
  const router = useRouter();

  // console.log(params)

  const activateHandler = async (status) => {
    try {
      // console.log({ status, selected })
      const {
        data: { message },
      } = await axios.put(`/api/${params.userId}`, { status, selected });
      setTableData((prev) => {
        return prev.map((item) => {
          if (selected[item.id]) {
            return { ...item, status };
          }
          return item;
        });
      });
      alert(message);
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
      router.push("/");
    }
  };
  const deleteHandler = async () => {
    try {
      // console.log(selected)
      const {
        data: { message },
      } = await axios.delete(`/api/${params.userId}`, { data: selected });
      setTableData((prev) => {
        return prev.filter((item) => !selected[item.id]);
      });
      alert(message);
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
      router.push("/");
    }
  };
  return (
    <div className="flex justify-center gap-4">
      <button
        className="bg-red-300 p-2 rounded-lg min-w-28 hover:bg-red-400 active:bg-red-500"
        onClick={() => activateHandler(1)}
      >
        Activate
      </button>
      <button
        className="bg-red-300 p-2 rounded-lg min-w-28 hover:bg-red-400 active:bg-red-500"
        onClick={() => activateHandler(0)}
      >
        Block
      </button>
      <button
        className="bg-red-300 p-2 rounded-lg min-w-28 hover:bg-red-400 active:bg-red-500"
        onClick={deleteHandler}
      >
        Delete
      </button>
    </div>
  );
};
