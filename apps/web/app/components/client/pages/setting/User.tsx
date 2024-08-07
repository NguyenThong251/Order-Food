import {
  Avatar,
  Button,
  Stack,
  Swal,
  TextInput,
  useEffect,
  useForm,
  useState,
} from "@repo/ui";
import { User } from "../../../../interface";
import { useUserStore } from "../../../../store";
import request from "../../../../utils/request";
import Link from "next/link";
import dynamic from "next/dynamic";

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
        setDataUser(res.data);
        // form.setValues({
        //   username: res.data.username,
        //   email: res.data.email,
        //   phone: res.data.phone,
        // });
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
      console.log(
        getdata.data.find(
          (user: User) =>
            user.phone === values.phone || user.email === values.email
        )
      );

      if (existingUser) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Email or phone number already exists.",
        });
        return;
      }
      // console.log(existingUser);
      if (user) {
        const res = await request.put(`/users/${user._id}`, {
          ...dataUser,
          ...data,
        });
        if (res.status === 200) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "You have successfully",
          });

          form.reset();
        }
      }
    } catch (err) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <>
      {user ? (
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
                error={form.errors.name && "Invalid name"}
                radius="md"
              />

              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
                {...form.getInputProps("email")}
                error={form.errors.email && "Invalid email"}
                radius="md"
              />
              <TextInput
                required
                label="Phone"
                placeholder="Phone Number"
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
      ) : (
        <>
          <div>
            <div className="text-2xl font-bold text-center text-customOrange">
              You need to register/login to receive a setting
            </div>
            <div className="flex justify-between gap-3 mt-10">
              <Link className="w-full" href="/auth/signup">
                <Button className="w-full" variant="outline" color="red">
                  Register
                </Button>
              </Link>
              <Link className="w-full" href="/auth/login">
                <Button className="w-full" color="red">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

// export default UserPage;

export default dynamic(() => Promise.resolve(UserPage), { ssr: false });
