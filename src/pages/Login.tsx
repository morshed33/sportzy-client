/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { setToken, setUser } from "@/redux/features/userSlice";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useLoginMutation } from "@/redux/api/auth/authApi";
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
import { validationRules } from "@/lib/utils";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await login(data).unwrap();
      const user = jwtDecode(response.token);
      dispatch(setToken(response.token));
      dispatch(setUser(user));
      toast({
        title: "Login Successful",
        description: `Welcome back ${user.name || ""}!`,
        variant: "success",
      });
      navigate(from);
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (user.role) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-600">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-indigo-700">
          Login
        </h2>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <div className="flex items-center justify-between">
              <Link
                to="/register"
                className="text-sm font-medium text-indigo-700"
              >
                New here? Register now
              </Link>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-indigo-700"
              >
                Forgot your password?
              </Link>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
