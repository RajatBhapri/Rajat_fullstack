"use server";

export type CreateTaskFormState = {
  success: boolean;
  message: string;
  errors: {
    title?: string;
    description?: string;
    priority?: string;
  };
};

export async function createTask(
  _prevState: CreateTaskFormState,
  formData: FormData,
): Promise<CreateTaskFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priority = String(formData.get("priority") ?? "").trim();

  const errors: CreateTaskFormState["errors"] = {};

  if (!title) {
    errors.title = "Task title is required.";
  } else if (title.length < 3) {
    errors.title = "Task title must be at least 3 characters.";
  }

  if (description.length > 300) {
    errors.description = "Description must be 300 characters or less.";
  }

  if (!["low", "medium", "high"].includes(priority)) {
    errors.priority = "Please select a valid priority.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the form errors.",
      errors,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    success: true,
    message: "Task created successfully.",
    errors: {},
  };
}