import { IconButton, InputBase, Paper, Popover } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Send } from "@mui/icons-material";
import { ChatContext } from "../Chat";

const MessageInput = () => {
  const { content, setContent, crrChat, handleSendMessage } =
    useContext(ChatContext);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setContent("");
  }, [crrChat]);

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage(content);
      }}
      sx={{ p: "2px 4px", display: "flex", height: 60, alignItems: "center" }}
    >
      <IconButton
        aria-describedby={id}
        onClick={() => {
          setAnchorEl(event.currentTarget);
          setEmojiPicker(true);
        }}
      >
        <EmojiEmotionsIcon
          sx={{
            color: "secondary.main",
          }}
        />
      </IconButton>

      <InputBase
        placeholder="Type a message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="send">
        <Send />
      </IconButton>

      {/* Emoji Picker */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <EmojiPicker
          width={320}
          open={emojiPicker}
          onEmojiClick={(emoji) => {
            setEmojiPicker(false);
            setContent((prevContent) => `${prevContent}${emoji.emoji}`);
          }}
        />
      </Popover>
    </Paper>
  );
};

export default MessageInput;
