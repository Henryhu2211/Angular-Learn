import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  // post:Post;
  @Output() newPost: EventEmitter<Post> = new EventEmitter();
  @Output() updatedPost: EventEmitter<Post> = new EventEmitter();
  @Input() currentPost: Post = {
    id: null,
    title: '',
    body: ''
  };
  @Input() isEdit: boolean;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  // ngOnChanges() {
  //   console.log(this.isEdit)
  //   if ( !this.isEdit){



  // }
  // }

  addPost(title: string, body: string) {
    // console.log(title,body);
    if (!title || !body) {
      alert("please input the title and body!!");
    } else {
      // console.log(title, body);
      this.postService.savePost({ title, body } as Post).subscribe(res => {
        // this.postService.getPost().subscribe(res => console.log(res));
        // console.log(post);
        this.newPost.emit({ title, body, ...res });
      }, err => { })
    }
  }
  updatePost() {
    this.postService.updatePost(this.currentPost).subscribe(
      res => {
        console.log(res)
        this.isEdit = false
        // this.currentPost = {
        //   id: null,
        //   title: '',
        //   body: ''
        // }
        this.updatedPost.emit(res)
      },
      error => { console.warn(error) }
    );
  }

}
