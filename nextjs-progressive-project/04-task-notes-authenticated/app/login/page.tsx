import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-2xl border bg-white p-8 shadow-sm dark:bg-zinc-900">
        <div>
          <h2 className="text-center text-3xl font-bold">Sign in to Task Notes</h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              create a new account
            </a>
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}