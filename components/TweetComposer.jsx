export default function TweetComposer() {
  return (
    <div className="px-4 py-3 border-b border-gray-800 flex">
      <div className="w-12 h-12 rounded-full bg-gray-800" />
      <div className="ml-4 flex-1">
        <input type="text" placeholder="What's happening?" 
          className="w-full bg-transparent text-white text-lg placeholder-gray-500 outline-none border-b-2 border-transparent focus:border-sky-500 transition" />
      </div>
    </div>
  );
}