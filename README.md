# S3oosh

S3oosh allows users to upload multiple files at once to S3 Buckets. It provides a drag-and-drop interface for users to easily upload files to a S3 Bucket. The component supports various file types and allows users to set maximum file count, maximum file size, and accepted file types.

## Features

- **Drag-and-Drop Interface**: Users can easily drag and drop files or click to browse for files to upload.
- **File Upload Progress**: Real-time progress tracking for each file being uploaded.
- **Error Handling**: Comprehensive error handling for failed uploads.
- **Support for Multiple File Types**: Accepts various file types such as images, PDFs, audio, and video files.
- **Cancel File Uploads**: Users can cancel file uploads in progress.
- **Customizable Configuration**: Configure maximum file count, maximum file size, and accepted file types.

## Usage Example

```javascript
import S3oosh from "@/components/s3oosh";

export default function Page() {
  const S3ooshConfig = {
    maxTotalFiles: 10,
    maxSize: 10485760,
    acceptedFileTypes: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
      "audio/*": [".mp3", ".wav", ".ogg"],
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
    },
  };

  return (
      <S3oosh config={S3ooshConfig} />
  );
}
```

## Security Considerations

S3oosh uses presigned URLs to upload files directly to S3 Buckets. For security reasons, it's recommended to block public access to S3 buckets and use IAM policies to control access.

### Example Bucket Policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PrivatePut",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::AWS ACCOUNT_ID:user/IAM USERNAME"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
        {
            "Sid": "PublicGet",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
    ]
}
```

Replace `AWS ACCOUNT_ID`, `IAM USERNAME`, and `YOUR_BUCKET_NAME` with your actual values.

### CORS Policy:

If you encounter CORS issues, you may need to configure CORS settings for your S3 bucket. Here's an example CORS policy:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD",
            "PUT"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```

## Clone the Repository

To clone the repository, run the following command:

```bash
git clone https://github.com/hamzasaleem2/s3oosh.git
```

## Install Dependencies

To install the dependencies, run the following command: 

```bash
bun install
```

## Dependencies

S3oosh relies on the following dependencies:

- Axios: HTTP requests for uploading files.
- Shadcn: for styling components.
- react-dropzone: for drag-and-drop functionality.

## Development

To contribute to S3oosh development, follow these steps:

1. Clone the repository: `git clone https://github.com/hamzasaleem2/s3oosh.git`
2. Install dependencies: `bun install`
3. Make changes and test locally: `bun dev`
4. Submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Axios](https://github.com/axios/axios)
- [React](https://reactjs.org/)
- [react-dropzone](https://github.com/react-dropzone/react-dropzone)
- [Shadcn](https://ui.shadcn.com/)

## Contact

If you have any questions or suggestions, feel free to reach out to me at hamzasaleembusiness@gmail.com.