import { Component, inject } from '@angular/core';
import { MissionService } from '../../core/services/mission/mission.service';
import { Mission } from '../../core/models/mission';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-completed-missions',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './completed-missions.component.html',
  styleUrl: './completed-missions.component.scss'
})
export class CompletedMissionsComponent {
  missionService = inject(MissionService)
  missions:Mission[]=[]
  ngOnInit() {
    this.getCompletedMissions()
  }
  getCompletedMissions() {
    this.missionService.getCompletedMissions().subscribe({
      next: (response) => {
        this.missions = response.result.missions
        console.log(this.missions)
      }, error: (error) => {
        console.log(error.error.message)
      }
    })
  }
}
