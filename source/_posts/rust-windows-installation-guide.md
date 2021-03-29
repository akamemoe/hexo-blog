---
title: rust编译器在windows下的安装
date: 2020-05-14 22:11:17
tags: [rust]
---

## 1.编译器的安装

打开在[rust](https://www.rust-lang.org/)官网下载的rustup-init.exe，由于rust编译器依赖于c/c++编译器，需要gcc/g++，所以如果你电脑没有这个环境控制台就会提示你安装vistual studio(最低版本2013)。
不过我嫌这个工具太大所以使用msys2来替代它。msys2是Windows平台下的包含gcc/g++的编译工具。打开msys2(https://www.msys2.org/)官网，下载后按照文档一步步安装即可。
<!--more-->

再次打开rustup-init.exe会看见如下提示：
```
Welcome to Rust!

This will download and install the official compiler for the Rust programming
language, and its package manager, Cargo.

It will add the cargo, rustc, rustup and other commands to Cargo's bin
directory, located at:

  ~\.cargo\bin

This path will then be added to your PATH environment variable by modifying the
HKEY_CURRENT_USER/Environment/PATH registry key.

You can uninstall at any time with rustup self uninstall and these changes will
be reverted.

Current installation options:

   default host triple: x86_64-pc-windows-msvc
     default toolchain: stable
  modify PATH variable: yes

1) Proceed with installation (default)    
2) Customize installation 
3) Cancel installation
> _

```
这里输入2并回车，修改host为：·x86_64-pc-windows-gnu·，toolchain改为：·stable·，modify PATH使用默认值`yes`.

安装完成后在控制台输入`rustup --version`,·rustc --version·,`cargo --version`都有输出版本信息则表示安装正确，可以使用了。

## 2.输出hello world

打开控制台输入`cargo new hello`就会在所在目录新建了个项目文件夹叫hello,再执行`cargo build`、`cargo run`即可看到在经过短暂的编译之后控制台输出了hello world.
可能你会问我什么代码都没写怎么会输出hello world呢，那是因为在创建项目的时候默认就是一个只输出hello world的空项目。打开项目目录下面的src目录即可看到有个main.rs的文件，内容就是：
```rust
fn main() {
    println!("Hello, world!");
}

```
在target/debug目录下你也可以找到编译后的EXE可执行文件。
