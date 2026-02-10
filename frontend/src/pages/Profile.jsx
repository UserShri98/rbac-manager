import api from "../api/axios";
import {useEffect,useState} from "react";

export default function Profile(){
  const [profile,setProfile]=useState(null);
  const [form,setForm]=useState({
    fullName:"",
    contactNumber:"",
  });
  const [file,setFile]=useState(null);
  const [previewUrl,setPreviewUrl]=useState(null);

  useEffect(()=>{
    api.get("/users/me").then((res)=>{
      setProfile(res.data);
      setForm({
        fullName:res.data.fullName,
        contactNumber:res.data.contactNumber,
      });
    });
  },[]);

  const handleFileChange=(e)=>{
    const selectedFile=e.target.files[0];
    setFile(selectedFile);
    if(selectedFile){
      const reader=new FileReader();
      reader.onloadend=()=>{
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const submit=async(e)=>{
    e.preventDefault();

    const data=new FormData();
    data.append("fullName",form.fullName);
    data.append("contactNumber",form.contactNumber);
    if (file) data.append("profilePic",file);

    const res=await api.put("/users/me",data);
    setProfile(res.data);
    setPreviewUrl(null);
    setFile(null);
    alert("Profile updated successfully!");
  };

  if (!profile)
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading profile...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            My Profile
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-32 sm:h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

          <div className="px-6 sm:px-10 pb-10">
            <div className="relative -mt-16 sm:-mt-20 mb-8">
              <div className="inline-block">
                <img
                  src={
                    previewUrl ||
                    (profile.profilePic
                      ? `http://localhost:6500${profile.profilePic}`
                      : "https://via.placeholder.com/150")
                  }
                  alt="Profile"
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 sm:border-6 border-white shadow-xl object-cover"
                />
                <div className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 sm:p-2.5 shadow-lg cursor-pointer hover:bg-indigo-700 transition-colors">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-5 border border-indigo-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-indigo-600 text-white rounded-lg p-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-indigo-700">Email</p>
                </div>
                <p className="text-gray-800 font-medium break-all">
                  {profile.email}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-purple-600 text-white rounded-lg p-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-purple-700">
                    Username
                  </p>
                </div>
                <p className="text-gray-800 font-medium break-all">
                  {profile.username}
                </p>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">✏️</span> Edit Profile
              </h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none"
                    value={form.contactNumber}
                    onChange={(e) =>
                      setForm({ ...form, contactNumber: e.target.value })
                    }
                    placeholder="Enter your contact number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
                  >
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        {file ? (
                          <span className="font-semibold text-indigo-600">
                            {file.name}
                          </span>
                        ) : (
                          <>
                            <span className="font-semibold text-indigo-600">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </>
                        )}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3.5 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl">
                💾 Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}