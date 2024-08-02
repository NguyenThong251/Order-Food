import {
  Avatar,
  Button,
  Stack,
  TextInput,
  useEffect,
  useForm,
  useState,
} from "@repo/ui";
import { User } from "../../../../interface";
import { useUserStore } from "../../../../store";
import request from "../../../../utils/request";

const UserPage = () => {
  const [dataUser, setDataUser] = useState<User | null>(null);
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      phone: "",
    },
    validate: {
      username: (value) => (value ? null : "Invalid name"),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      phone: (val) => (/^\d{10}$/.test(val) ? null : "Invalid phone number"),
    },
  });

  if (user) {
    const fetchUser = async () => {
      try {
        const res = await request.get(`users/${user._id}`);
        console.log(res.data.email);
        setDataUser(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchUser();
    }, []);
  }
  const handleSubmit = async (values: typeof form.values) => {
    try {
      const data = {
        email: values.email,
        username: values.username,
        phone: values.phone,
      };
      const getdata = await request.get("/users");
      const existingUser = getdata.data.find(
        (user: User) =>
          user.phone === values.phone || user.email === values.email
      );
      if (existingUser) {
        // User already exists
        // setNotification({
        //   title: "Error",
        //   message: "Email or phone number already exists.",
        //   color: "red",
        //   icon: <FiAlertCircle size={18} />,
        // });
        return;
      }
      // console.log(existingUser);

      const res = await request.post("/users", data);
      if (res.status === 201) {
        // setNotification({
        //   title: "Success",
        //   message: "You have successfully signed up!",
        //   color: "teal",
        //   icon: <FiCheckCircle size={18} />,
        //});
        form.reset();
      }
    } catch (err) {
      console.log(err);
      //   setNotification({
      //     title: "Error",
      //     message: "An error occurred. Please try again.",
      //     color: "red",
      //     icon: <FiAlertCircle size={18} />,
      // });
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex flex-col gap-5 mt-6 sm:flex-row">
        {/* <Image src="" alt=""/> */}
        <div className="flex flex-col items-center p-3 rounded-lg bg-slate-100">
          <Avatar
            className="w-24 h-24 text-sm text-center"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
            alt="it's me"
          />
          <div className="text-lg font-medium">{dataUser?.username}</div>
          <div className="text-lg font-medium">Point: {dataUser?.point}</div>
        </div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack className="w-full sm:w-80">
            <TextInput
              label="Name"
              placeholder="Your name"
              {...form.getInputProps("username")}
              value={dataUser?.username}
              error={form.errors.name && "Invalid name"}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={dataUser?.email}
              {...form.getInputProps("email")}
              error={form.errors.email && "Invalid email"}
              radius="md"
            />
            <TextInput
              required
              label="Phone"
              placeholder="Phone Number"
              value={dataUser?.phone}
              {...form.getInputProps("phone")}
              error={form.errors.phone && "Invalid phone"}
              radius="md"
            />
          </Stack>
          <Button className="mt-5 " color="red" type="submit" radius="md">
            Save
          </Button>
        </form>
      </div>
    </>
  );
};

export default UserPage;
