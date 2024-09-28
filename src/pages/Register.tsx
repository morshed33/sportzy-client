/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSignUPMutation } from "@/redux/api/auth/authApi";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/redux/hook";
import { validationRules } from "@/lib/utils";

interface RegisterFormInputs {
  name: string;
  email: string;
  role: string;
  password: string;
  phone: string;
  address: string;
}

const Register: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUPMutation();

  const form = useForm<RegisterFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      password: "",
      phone: "",
      address: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await signUp(data).unwrap();
      toast({
        title: "Registration Successful",
        description: "You can now log in!",
        variant: "success",
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (user.role) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-red-700">
          Register
        </h2>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="name"
              rules={validationRules.name} // Use reusable validation rules
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              rules={validationRules.email} // Use reusable validation rules
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="role"
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.role?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              rules={validationRules.password} // Use reusable validation rules
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormMessage>{errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              rules={validationRules.phone} // Use reusable validation rules
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      {...field}
                      placeholder="Enter your phone number"
                    />
                  </FormControl>
                  <FormMessage>{errors.phone?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="address"
              rules={validationRules.address} // Use reusable validation rules
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your address" />
                  </FormControl>
                  <FormMessage>{errors.address?.message}</FormMessage>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        <div className="flex justify-center mt-4">
          <Link to="/login" className="text-sm text-indigo-700">
            Already registered? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
