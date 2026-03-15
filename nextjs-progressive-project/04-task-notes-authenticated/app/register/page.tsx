import RegisterForm from "./register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-2xl border bg-white p-8 shadow-sm dark:bg-zinc-900">
        <div>
          <h2 className="text-center text-3xl font-bold">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              sign in
            </a>
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}