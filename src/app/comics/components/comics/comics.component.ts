import { Component, inject, OnInit } from '@angular/core';
import { ComicsService } from '../../services/comics.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { TableModule } from 'primeng/table';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ImportsModule } from '../../../shared/components/imports';

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.scss',
})
export class ComicsComponent implements OnInit {
  myComics: any[] = [];
  totalRecords: number = 0;
  loading: boolean = false;

  marvelService = inject(ComicsService);
  favoriteService = inject(FavoritesService);
  currentComic: any;
  visible: boolean = false;

  ngOnInit(): void {
    this.getComics();
  }

  getComics() {
    this.marvelService.getComics(0, 10).subscribe((comics: any) => {
      this.myComics = comics.results;
    });
  }

  loadComics(event: any) {
    this.loading = true;
    const offset = event.first;
    const limit = event.rows;

    this.marvelService.getComics(offset, limit).subscribe({
      next: (data: any) => {
        if (data && data.length === 0) {
          return;
        }
        this.myComics = data.results;
        this.totalRecords = data.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar los cómics:', err);
        this.loading = false;
      },
    });
  }

  comicDetails(comic: any) {
    this.currentComic = comic;
    this.visible = true;
  }

  onDialogClose() {
    this.visible = false;
    console.log(
      '🚀 ~ ComicsComponent ~ onDialogClose ~ visible:',
      this.visible
    );
    // document.getElementById('dialog')?.remove();
  }
}
