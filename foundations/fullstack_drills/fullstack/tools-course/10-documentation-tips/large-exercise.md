# How a Cloud Service Works

## Step 1: Uploading a File

When you upload a file:

```mermaid
flowchart LR
A[User selects file] --> B[Upload to cloud server]
B --> C[Cloud server stores file]
```

You choose a file, and it’s sent to a cloud server.

## Step 2: Cloud Server Stores Data

The cloud service saves your file in its data centers.

```mermaid
sequenceDiagram
participant User
participant CloudServer

User->>CloudServer: Upload file
CloudServer-->>CloudServer: Store file in data center
CloudServer-->>User: Confirmation
```

Your file is stored securely, and you receive confirmation.

## Step 3: Accessing Files

Later, when you access your file:

```mermaid
flowchart TD
A[User requests file] --> B[Cloud server fetches file]
B --> C[File sent back to user]
C --> D[User accesses file]
```

The cloud server retrieves your file and sends it back to you.
